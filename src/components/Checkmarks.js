// import * as React from "react";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function MultipleSelectCheckmarks({ initialSelectedNames, onChange }) {
//   // Convert initial names to IDs for easier handling in Select
//   const initialIds = roleList
//     .filter((role) => initialSelectedNames.includes(role.name))
//     .map((role) => role.id.toString());
//   const [selectedRoles, setSelectedRoles] = React.useState(initialIds);

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     // Update selected roles
//     setSelectedRoles(typeof value === "string" ? value.split(",") : value);
//     // Notify parent component with names instead of IDs
//     onChange(
//       value.map((v) => roleList.find((role) => role.id.toString() === v)?.name)
//     );
//   };

//   return (
//     <div>
//       <FormControl fullWidth sx={{ m: 1 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={selectedRoles}
//           onChange={handleChange}
//           input={<OutlinedInput label="Roles" />}
//           renderValue={(selected) =>
//             selected
//               .map(
//                 (id) => roleList.find((role) => role.id.toString() === id)?.name
//               )
//               .join(", ")
//           }
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 224,
//                 width: 250,
//               },
//             },
//           }}
//         >
//           {roleList.map((role) => (
//             <MenuItem key={role.id} value={role.id.toString()}>
//               <Checkbox checked={selectedRoles.includes(role.id.toString())} />
//               <ListItemText
//                 primary={role.name}
//                 primaryTypographyProps={{ style: { color: role.color } }}
//               />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

// export default MultipleSelectCheckmarks;
