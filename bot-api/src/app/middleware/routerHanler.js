import router from "../../routes/mainRoute";
import throwError from "../../utils/throwError";

const routerHandler = async (ctx, next) => {
    const hasRouteHandler = router.match(ctx.path, ctx.method).route;

    if (!hasRouteHandler) {
        throwError('Not Found', 404);
    } 
    await next();
  
}

export default routerHandler;