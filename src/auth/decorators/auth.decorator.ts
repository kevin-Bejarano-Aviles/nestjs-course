import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(role:Role) {
    //appyDecorators == Junta mas de un decorador en uno solo
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard,RolesGuard)
    )
}