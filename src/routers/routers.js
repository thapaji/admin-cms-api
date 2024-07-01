import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";

export default[
    {
        path: '/api/v1/users',
        middlewares: [userRouter],
    },
    {
        path: '/api/v1/users',
        middlewares: [categoryRouter],
    }
]