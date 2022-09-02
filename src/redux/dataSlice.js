import { createSlice } from "@reduxjs/toolkit";

/*
   
      const allTags = medias.map((item) => {
        return item;
        // return { tags: item.acf.tags[0].slug, id: item.author };
      });
      
  const result = allTags.reduce((acc, cur) => {
    const i = acc.findIndex((a) => a.id === cur.id);
    if (i === -1) return [...acc, { ...cur, tags: [cur.tags] }];
    return [
      ...acc.slice(0, i),
      { ...cur, tags: [...acc[i].tags, cur.tags] },
      ...acc.slice(i + 1),
    ];
  }, []);

  console.log("result", result);

  const mergeDataById = (arr1, arr2) =>
    arr1.map((itm) => ({
      ...arr2.find((item) => item.id === itm.author),
      ...itm.acf,
    }));


    
          console.log("tags", allTags)
          
          console.log("data", photographers, medias),
          console.log(mergeDataById(photographers, allTags))

*/

/*
  const tags = useSelector((state) => state.data.tags);
  const currentTag = useSelector((state) => state.data.currentTag);
  const filteredPhotographersByTag =
    currentTag.length > 0
      ? photographers.filter((photographer) =>
          photographer.tags.includes(currentTag)
        )
      : photographers;
*/

/*
const data = require("../../data.json");
const photographers = data[0].photographers;
const medias = data[0].media;
const allTags = photographers.map((item) => item.tags);
const mergeDeduplicate = (arr) => {
  return [...new Set([].concat(...arr))];
};
*/

const initialState = {
  photographers: [],
  medias: [],
  /*
  tags: mergeDeduplicate(allTags),
  currentTag: "",
  */
};

// Redux Toolkit slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentTag: (state, action) => {
      state.currentTag = action.payload;
    },
    setCurrentPhotographer: (state, action) => {
      state.photographers = action.payload;
    },
    setCurrentMedias: (state, action) => {
      state.medias = action.payload;
    },
  },
});

export const { setCurrentTag, setCurrentPhotographer, setCurrentMedias } =
  dataSlice.actions;

export default dataSlice.reducer;
