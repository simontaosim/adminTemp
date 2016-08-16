export const CHANGE_FORM_DATA = "CHANGE_FORM_DATA";
export const CHANGE_FORM_LOADING = "CHANGE_FORM_LOADING";


export function changeFormData(data){
  return {type: CHANGE_FORM_DATA, data};
}

export function changeFormLoading(isLoading){
  console.log(isLoading);
  return {type: CHANGE_FORM_LOADING, isLoading}
}
