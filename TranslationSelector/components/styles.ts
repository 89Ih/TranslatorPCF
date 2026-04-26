import { makeStyles, tokens } from "@fluentui/react-components";

export const useSelectorStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "4px",
    
  },
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: "8px",
    paddingLeft: 0,
    display: "flex",
    flexWrap: "wrap",
    gridGap: tokens.spacingHorizontalXXS,
  },
  button :{
    width:"100px",
    marginLeft : "2px",
    marginTop:"3px"
  }
});