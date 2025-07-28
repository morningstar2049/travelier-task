import {
  DialogActions,
  type DialogActionsProps,
  DialogContent,
  type DialogContentProps,
  type DialogProps,
  IconButton,
  type IconButtonProps,
  Dialog as MuiDialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/CancelPresentation";

const Content = ({ sx, ...rest }: DialogContentProps) => {
  return <DialogContent sx={{ padding: 0, ...sx }} {...rest} />;
};
const Actions = (props?: DialogActionsProps) => {
  const { sx, ...rest } = props || {};
  return (
    <DialogActions
      sx={{
        marginTop: 2,
        padding: 0,
        "&>:not(style)~:not(style)": {
          marginLeft: 2,
        },
        ...sx,
      }}
      {...rest}
    />
  );
};
const Close = ({ children = <CloseIcon />, ...rest }: IconButtonProps) => (
  <IconButton
    aria-label="close"
    className="icon-only"
    sx={{
      position: "absolute",
      right: 24,
      top: 24,
      svg: {
        width: 24,
        height: 24,
        // path: {
        //   fill: ({ palette }) => palette.base.black,
        // },
      },
    }}
    {...rest}
  >
    {children}
  </IconButton>
);
const Dialog = (props: DialogProps) => {
  return (
    <MuiDialog
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 3,
          maxWidth: 888,
          maxHeight: "calc(100% - 24px)",
        },
      }}
      {...props}
    />
  );
};
Dialog.Content = Content;
Dialog.Actions = Actions;
Dialog.Close = Close;
export default Dialog;
