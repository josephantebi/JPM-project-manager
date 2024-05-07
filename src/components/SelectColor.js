import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ColorSelect({ colors, selectedColor, onChange }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="color-select-label" sx={{ color: "black" }}></InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        value={selectedColor}
        label=""
        onChange={onChange}
        sx={{
          backgroundColor: selectedColor, // Set background to selected color
          color: selectedColor, // Set text color to match background
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "black", // Set border color to match background
          },
          // "& .MuiPaper-root": {
          //   backgroundColor: "transparent", // Makes dropdown background transparent
          // },
          // "& .MuiList-root": {
          //   backgroundColor: selectedColor, // Set dropdown list background color
          // },
          ".MuiSelect-select": {
            bgcolor: selectedColor,
            color: "transparent",
          },
          "& .MuiSvgIcon-root": {
            color: "white", // This is for the dropdown icon
          },
        }}
      >
        {colors.map(
          (color) =>
            color.available && (
              <MenuItem
                key={color.id}
                value={color.color}
                sx={{
                  bgcolor: color.color,
                  color: "transparent", // Text color is transparent to see the color only
                  "&.Mui-selected, &.Mui-selected:hover, &:hover": {
                    bgcolor: color.color, // Keep background color on hover
                    color: "transparent", // Keep text transparent
                  },
                }}
              >
                color
              </MenuItem>
            )
        )}
      </Select>
    </FormControl>
  );
}

export default ColorSelect;
