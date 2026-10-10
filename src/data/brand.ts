export const languages = {fr:{locale:'fr-FR',name:'Français'},en:{locale:'en-GB',name:'English'},nl:{locale:'nl-NL',name:'Nederlands'},de:{locale:'de-DE',name:'Deutsch'},vi:{locale:'vi-VN',name:'Tiếng Việt'}} as const;
export type Language = keyof typeof languages;
export const brand = {
 name:'Bastide Horizons Wellness', wordmark:'BASTIDE HORIZONS', tagline:'WELLNESS',
 address:'293 Les Combes O, 26110 Piégon, France',
 maps:'https://maps.app.goo.gl/PhCqzWCSDQPQQQXbA', latitude:44.2974709, longitude:5.1158487,
 email:null as string|null, phone:null as string|null,
 logo:null as string|null, currency:'EUR',
 forms:{stay:import.meta.env.PUBLIC_STAY_FORM_ENDPOINT || '',wellness:import.meta.env.PUBLIC_WELLNESS_FORM_ENDPOINT || ''},
 legal:{operator:null as string|null,siret:null as string|null,publicationDirector:null as string|null,privacyContact:null as string|null,retentionPeriod:null as string|null,hostingProvider:null as string|null},
};
