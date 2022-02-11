export const findSameTitle = (array: any[] | undefined, title: String, id: Number = -1) => {
   const matchingTitle = id != -1 ?
       array?.filter(element => element.id != id).find((element) => element.title === title)
       : array?.find((element) => element.title === title)
   return !!matchingTitle
}

export const resolveNotOnProject = (array: any[] | undefined, arrayToCompare: any[] | undefined) => {
   let result = [];
   if (array && array[0] && arrayToCompare) {
      result = array.filter(element => {
         return !arrayToCompare?.map(el => el.id).includes(element.id)
      })
   }
   return result.length > 0 ? result : false
}