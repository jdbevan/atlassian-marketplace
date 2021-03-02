import { Either } from "fp-ts/lib/Either";
import { left, right } from 'fp-ts/Either'

export const safeFetch = <ResponseType>(url: string, opts?: RequestInit | undefined): Promise<Either<Error, ResponseType>> => {
    return fetch(url, opts)
        .then(resp => {
            if (resp.ok) {
                return resp.json()
                    .then(body => right(body as ResponseType))
                    .catch(err => {
                        throw new Error(`Response was not JSON: ${err}`);
                    });
            }
            throw new Error(`Response status was ${resp.status}`);
        })
        .catch((err: Error) => left(err));
}