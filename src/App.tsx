import { GridActionsCellItem, type GridColDef } from "@mui/x-data-grid";
import Table from "./components/Table";
import { useGetDealsQuery } from "./queries/useGetDealsQuery";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";
import type { IDeal } from "./types";
import { useState } from "react";
import Dialog from "./components/Dialog";
import DealsForm, { defaultValues } from "./components/DealsForm";
import { toast } from "react-toastify";

function App() {
  const { data, isPending } = useGetDealsQuery();
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogState, setEditDialogState] = useState({
    open: false,
    initialData: defaultValues,
  });
  const [confirmationDialogState, setConfirmationDialogState] = useState<{
    open: boolean;
    id: number | null;
  }>({
    open: false,
    id: null,
  });

  const handleEdit = (params: IDeal) => {
    const mappedData = {
      ...params,
      dealName: params.name,
      startDate: new Date(params.startDate).toISOString().split("T")[0],
      endDate: new Date(params.endDate).toISOString().split("T")[0],
      markupPercent: 0,
    };
    setEditDialogState({ open: true, initialData: mappedData });
  };

  const handleDelete = (id: number) => {
    queryClient.setQueryData<IDeal[]>(["getDeals"], (data) => {
      return data?.filter((row) => row.id !== id);
    });
    setConfirmationDialogState({ open: false, id: null });
    toast.success("Deal Successfully deleted");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, filterable: false },
    { field: "client", headerName: "Client", width: 150, flex: 1 },
    { field: "name", headerName: "Name", width: 200, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      flex: 1,
      sortable: false,
      filterable: false,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      flex: 1,
      valueFormatter: (value) => new Date(value).toISOString().split("T")[0],
      filterable: false,
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      flex: 1,
      valueFormatter: (value) => new Date(value).toISOString().split("T")[0],

      filterable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() =>
            setConfirmationDialogState({ open: true, id: params?.id as number })
          }
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Box p={2}>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => setCreateDialogOpen(true)}
      >
        Create Deal
      </Button>
      <Table
        showToolbar
        columns={columns}
        rows={data}
        loading={isPending}
        filterDebounceMs={300}
      />
      <Dialog
        slotProps={{
          paper: { sx: { width: "100%", p: 2 } },
        }}
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false);
        }}
      >
        <Dialog.Close
          onClick={() => {
            setCreateDialogOpen(false);
          }}
        />
        <Dialog.Content>
          {createDialogOpen && (
            <DealsForm
              handleSubmitForm={(newData) => {
                queryClient.setQueryData<IDeal[]>(["getDeals"], (data = []) => {
                  return [
                    ...data,
                    { ...newData, name: newData.dealName, id: data.length + 1 },
                  ];
                });
                setCreateDialogOpen(false);
                toast.success("New Deal Added");
              }}
              initialData={defaultValues}
              mode="create"
            />
          )}
        </Dialog.Content>
      </Dialog>
      <Dialog
        slotProps={{
          paper: { sx: { width: "100%", p: 2 } },
        }}
        open={editDialogState.open}
        onClose={() => {
          setEditDialogState({ initialData: defaultValues, open: false });
        }}
      >
        <Dialog.Close
          onClick={() => {
            setEditDialogState({ initialData: defaultValues, open: false });
          }}
        />
        <Dialog.Content>
          {editDialogState.open && (
            <DealsForm
              handleSubmitForm={(newData) => {
                queryClient.setQueryData<IDeal[]>(["getDeals"], (data = []) => {
                  const updatedData = data.map((item) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    item.id === editDialogState.initialData?.id
                      ? { ...item, ...newData }
                      : item
                  );
                  return updatedData;
                });
                setCreateDialogOpen(false);
                toast.success("New Deal Added");
              }}
              initialData={editDialogState.initialData}
              mode="edit"
            />
          )}
        </Dialog.Content>
      </Dialog>
      <Dialog
        open={confirmationDialogState.open}
        onClose={() => setConfirmationDialogState({ open: false, id: null })}
      >
        <Dialog.Content>
          Are you sure you want to delete this deal?
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(confirmationDialogState.id!)}
          >
            Yes
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Box>
  );
}

export default App;
