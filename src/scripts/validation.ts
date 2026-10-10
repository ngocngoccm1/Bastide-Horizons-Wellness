export type ValidationCode = 'requiredError'|'emailError'|'dateError'|'pastError'|'numberError'|'consentError';
export function localToday(date = new Date()):string {
 return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function validateValue(name:string,value:string,required:boolean,today:string):ValidationCode|null {
 if(required&&!value.trim())return name==='consent'?'consentError':'requiredError';
 if(!value)return null;
 if(name==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))return 'emailError';
 if(['guests','participants'].includes(name)&&(!Number.isSafeInteger(Number(value))||Number(value)<1))return 'numberError';
 if(['arrival','departure','date'].includes(name)){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(Date.parse(value)))return 'requiredError';
  if(new Date(value).toISOString().slice(0,10)!==value)return 'requiredError';
  if(value<today)return 'pastError';
 }
 return null;
}
export function validateDates(arrival:string,departure:string):ValidationCode|null {
 return arrival&&departure&&departure<=arrival?'dateError':null;
}
