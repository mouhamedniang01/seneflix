
// check if string is not empty or blank
export function isStringEmpty(word:string):boolean {
  return (!word || word.length === 0 );
}

export enum ToastSeverity{
  WARN='warn',
  ERROR='error',
  INFO='info',
  SUCCESS='success'
}

//toast message severity
export const TOAST_SEVERITY_SUCCESS= 'success';
export const TOAST_SEVERITY_ERROR= 'error';

//toast message position
export const TOAST_POSITION_TOP_LEFT = "top-left";
export const TOAST_POSITION_TOP_RIGHT = "top-right";
export const TOAST_POSITION_BOTTOM_LEFT = "bottom-left";
export const TOAST_POSITION_BOTTOM_RIGHT = "bottom-right";
