import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
      overflow: "auto",
      border: "none",
      borderRadius: "25px",
    },
  },
};

export default function PrioritySelect({ priority, setPriority }) {
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth sx={{ m: 1, width: 300 }}>
        <InputLabel id="priority-select-label" sx={{ color: "white" }}>
          Priority:
        </InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={priority}
          onChange={handleChange}
          input={
            <OutlinedInput label="Priority" sx={{ borderRadius: "50px" }} />
          }
          MenuProps={MenuProps}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderRadius: "25px",
            },
            ".MuiSelect-select": {
              bgcolor: "#4e5681",
              color: "white",
              borderRadius: "25px",
            },
            ".MuiPaper-root": {
              boxShadow: "none",
              borderRadius: "25px",
            },
          }}
        >
          {["Urgent", "Important", "Normal", "Low"].map((priority) => (
            <MenuItem
              key={priority}
              value={priority}
              sx={{
                bgcolor: "white",
                color: "black",
                "&.Mui-selected": {
                  bgcolor: "#1c2a7d",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#48517e",
                    color: "white",
                  },
                },
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
            >
              {priority}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
