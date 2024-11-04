export interface IOrderVerifyingPayloadData {
    cipher: string;

    verifiedById: number;

    verifiedByName: string;

    verifiedDate: Date;
}

export interface IOrderConfirmingPayloadData {
    confirmedById: number;

    confirmedByName: string;

    confirmedDate: Date;
}


export interface IOrderPayloadData {
    price: string;

    telegram_user_id: string;

    telegram_nickname: string;

    fio: string;

    course: string;

    semester: string;

    group: string;

    type?: string;
    
    lessons: string;
}