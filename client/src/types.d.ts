interface User {
    privateKey: object,
    publicKey: { n?: string },
    username: string,
    id: string,
}

interface Room {
    members: User[],
    id: string,
    isLocked: boolean,
}

interface  Activities {
    items: any[]
}
