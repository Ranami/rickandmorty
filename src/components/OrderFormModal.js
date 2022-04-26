import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../store/actions/shopActions";
import {
  Modal,
  Typography,
  Box,
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import { validatePhoneNumber } from "../utils/validatePhoneNumber";
import { useForm, Controller } from "react-hook-form";
import { getFieldState } from "../utils/getFieldState";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  gap: 4,
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 15,
  width: "80%",
  margin: "0 auto",
};

export const OrderFormModal = () => {
  const open = useSelector((state) => state.shop.modalOpen);
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      comment: "",
    },
  });

  const handleClose = useCallback(() => {
    dispatch({ type: CLOSE_MODAL });
  }, [dispatch]);

  const onSubmit = useCallback(
    (values) => {
      alert("SUBMIT");
      console.log(values);
      dispatch({ type: CLOSE_MODAL });
      reset();
    },
    [dispatch, reset]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ margin: "0 auto" }}>
          Application form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "This is a required field",
                validate: (value) => {
                  if (value.length >= 3) {
                    return true;
                  } else {
                    return "Required more than 2 symbols";
                  }
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Name"
                  variant="outlined"
                  {...field}
                  {...getFieldState({ fieldState, formState })}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "This is a required field",
                validate: (value) => {
                  if (validatePhoneNumber(value)) {
                    return true;
                  } else {
                    return "Incorrect phone number";
                  }
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Phone number"
                  variant="outlined"
                  {...field}
                  {...getFieldState({ fieldState, formState })}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="email"
              rules={{
                validate: (value) => {
                  if (
                    /[^!@$#%^&*()_+][\w]+@[\w]+\.[\w]+/.test(value) ||
                    value.length === 0
                  ) {
                    return true;
                  } else {
                    return "Invalid email";
                  }
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  {...field}
                  {...getFieldState({ fieldState, formState })}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="comment"
              rules={{
                validate: (value) => {
                  if (value) {
                    return value.length >= 10
                      ? true
                      : "Required more than 10 symbols";
                  } else {
                    return true;
                  }
                },
              }}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Comment"
                  multiline
                  rows={4}
                  {...field}
                  {...getFieldState({ fieldState, formState })}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  {...field}
                >
                  <MenuItem value={10}>Astana</MenuItem>
                  <MenuItem value={20}>Almaty</MenuItem>
                  <MenuItem value={30}>Shymkent</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Button type="submit" variant="contained">
            Send
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
