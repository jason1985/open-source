import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RouteDataHasService } from '../route-data-has/route-data-has.service';

@Directive({ selector: '[tdRouteTag]', providers: [RouteDataHasService] })
export class RouteTagDirective<CThen, CElse, RouteTags extends string = string> implements OnInit {
  @Input()
  set tdRouteTag(tags: RouteTags | RouteTags[]) {
    this.routeDataHasService.setTags(tags);
  }

  @Input()
  set tdRouteTagElse(elseTemplate: TemplateRef<CElse>) {
    this.routeDataHasService.setElseTemplate(elseTemplate);
  }

  constructor(
    private template: TemplateRef<CThen>,
    private viewContainer: ViewContainerRef,
    private routeDataHasService: RouteDataHasService<CThen, CElse, RouteTags, 'routeTags'>
  ) {}

  ngOnInit(): void {
    this.routeDataHasService.setPropName('routeTags');
    this.routeDataHasService.init(this.template, this.viewContainer);
  }
}
