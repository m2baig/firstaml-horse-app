export default interface IRoute {
  path: string | string[];
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}
