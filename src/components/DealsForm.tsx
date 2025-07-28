import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useGetClientsQuery } from "../queries/useGetClientsQuery";
import { statusOptions } from "../constants";
import { dealSchema } from "../config";

interface IDealsFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmitForm: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any;
  mode: "edit" | "create";
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultValues = {
  client: "", // empty selection for dropdown
  dealName: "", // empty input
  status: "", // default to first enum value
  startDate: "", // or "" if you're using strings
  endDate: "", // or ""
  markupPercent: 0, // default to 0
};

function DealsForm({ handleSubmitForm, initialData, mode }: IDealsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: initialData || defaultValues,
    resolver: yupResolver(dealSchema),
  });

  const { data } = useGetClientsQuery();

  const today = new Date().toISOString().split("T")[0]; // yyyy-MM-dd

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={5}
      py={10}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleSubmitForm)();
      }}
    >
      {new Date(watch("startDate")) < new Date() &&
      watch("status") === "Draft" ? (
        <Typography color="warning">
          Warning: This deal is in draft but has already started. Consider
          changing the status to Active.
        </Typography>
      ) : null}
      <Controller
        name="client"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error?.message} fullWidth>
            <InputLabel>Client</InputLabel>
            <Select {...field} label="Investment Timeframe">
              {data?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <TextField
        fullWidth
        {...register("dealName")}
        label="Deal Name"
        error={!!errors.dealName}
        helperText={errors.dealName?.message as string}
      />
      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <FormControl error={!!fieldState.error?.message} fullWidth>
            <InputLabel>Status</InputLabel>
            <Select {...field} label="Status">
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <TextField
        {...register("startDate")}
        fullWidth
        type="date"
        label="Start Date"
        inputProps={{
          min: mode === "create" ? today : undefined,
        }}
        error={!!errors.startDate}
        helperText={errors.startDate?.message as string}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        {...register("endDate")}
        fullWidth
        type="date"
        label="End Date"
        error={!!errors.endDate}
        helperText={errors.endDate?.message as string}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        {...register("markupPercent")}
        fullWidth
        type="number"
        label="Markup Percent"
        error={!!errors.annualIncome}
        helperText={errors.annualIncome?.message as string}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
}

export default DealsForm;
