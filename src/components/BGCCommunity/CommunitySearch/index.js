import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CommunitySearchComp() {
  const fixedOptions = [top100Films[6]];
  const [value, setValue] = React.useState([...fixedOptions, top100Films[13]]);

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      sx={{ width: 500, margin: "10px 10px 20px 11px" }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Search Communities" />
      )}
    />

    // <Autocomplete
    //   multiple
    //   id="fixed-tags-demo"
    //   value={value}
    //   limitTags={2}
    //   onChange={(event, newValue) => {
    //     setValue([
    //       ...fixedOptions,
    //       ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
    //     ]);
    //   }}
    //   options={top100Films}
    //   getOptionLabel={(option) => option.title}
    //   renderTags={(tagValue, getTagProps) =>
    //     tagValue.map((option, index) => (
    //       <Chip
    //         label={option.title}
    //         {...getTagProps({ index })}
    //         disabled={fixedOptions.indexOf(option) !== -1}
    //       />
    //     ))
    //   }
    //   sx={{ width: 500 , margin: "10px 10px 20px 11px" }}
    //   renderInput={(params) => (
    //     <TextField {...params}  placeholder="Search Communities" />
    //   )}
    // />
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
];