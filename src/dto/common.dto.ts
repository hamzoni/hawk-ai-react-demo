export class Paging {
    page: number = 0;
    size: number = 5;
}

export class ListRequest<T> {
    paging: Paging = new Paging();
    list: T[] = [];
}
