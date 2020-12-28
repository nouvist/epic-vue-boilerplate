declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: DefineComponent;
  export default component;
}

declare module '*' {
  const path: string;
  export default path;
}
