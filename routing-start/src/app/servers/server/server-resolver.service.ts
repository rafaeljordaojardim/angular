import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

type resp = {id: number; name: string; status: string};

@Injectable()
export class ServerResolver implements Resolve<resp> {

  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): resp | Observable<resp> | Promise<resp> {
    return this.serversService.getServer(+route.params['id']);
  }

}
