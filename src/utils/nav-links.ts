import type {ProductMaster} from "chums-types";
import {generatePath} from "react-router";

export const productEditLink = (arg:Pick<ProductMaster, 'id'>) => generatePath(`/product-edit/:id`, {id: `${arg.id}`})
