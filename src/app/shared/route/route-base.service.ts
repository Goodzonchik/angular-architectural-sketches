export class RouteBaseService {
  private routePath = '';
  registry = '';
  add = '';

  constructor(routePath: string) {
    this.routePath = routePath;
    this.registry = `${routePath}/registry`;
    this.add = `${routePath}/add`;
  }

  card(id: number | string): string {
    return `${this.routePath}/${id}`;
  }

  edit(id: number | string): string {
    return `${this.routePath}/${id}/edit`;
  }
}
