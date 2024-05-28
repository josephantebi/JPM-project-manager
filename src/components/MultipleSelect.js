import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    },
  },
};

function formatName(name) {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getStyles(name, personNames, theme) {
  return {
    fontWeight:
      personNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  users,
  onSelectedNamesChange,
  selectedNames,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const result = typeof value === "string" ? value.split(",") : value;
    onSelectedNamesChange(result);
  };

  const validSelectedNames = selectedNames.filter((name) => name.trim() !== "");

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label" sx={{ color: "white" }}>
          Users:
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={validSelectedNames}
          onChange={handleChange}
          input={<OutlinedInput label="Name" sx={{ borderRadius: "50px" }} />}
          MenuProps={MenuProps}
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
              borderRadius: "25px", // Make sure this matches or is visually compatible
            },
            ".MuiSelect-select": {
              bgcolor: "#4e5681",
              color: "white",
              borderRadius: "25px", // Apply rounding here as well
            },
            ".MuiPaper-root": {
              boxShadow: "none",
              borderRadius: "25px", // This will round the dropdown menu
            },
          }}
        >
          {users.map((user) => (
            <MenuItem
              key={user.id}
              value={user.nickname} // Use nickname as the value
              sx={{
                bgcolor: "#5066de",
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
                  bgcolor: "#2d3878",
                  color: "white",
                },
              }}
            >
              {formatName(user.nickname)}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
