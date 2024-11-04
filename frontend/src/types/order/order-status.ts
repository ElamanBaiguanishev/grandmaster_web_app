export enum OrderStatus {
    NEW = 'NEW',              // Белый: Необработанный - только пришел
    PENDING = 'PENDING',      // Красный: Не обработан больше 3х дней
    VERIFIED = 'VERIFIED',    // Желтый: Обработанный - сверен с базой студентов
    CONFIRMED = 'CONFIRMED'   // Зеленый: Подтвержденный - взят в работу
}

export const statusColorMapMui: Record<OrderStatus, 'inherit' | 'error' | 'warning' | 'success'> = {
    NEW: 'inherit',          // Необработанный - белый
    PENDING: 'error',        // Не обработан больше 3х дней - красный
    VERIFIED: 'warning',    // Обработанный - желтый
    CONFIRMED: 'success'     // Подтвержденный - зеленый
};

export const statusColorMapStd: Record<OrderStatus, string> = {
    NEW: '#F5F5F5',          // Необработанный - белый
    PENDING: '#ff9090',        // Не обработан больше 3х дней - красный
    VERIFIED: '#ffff90',    // Обработанный - желтый
    CONFIRMED: '#90ff90'     // Подтвержденный - зеленый
};


export const statusTextMap: Record<OrderStatus, string> = {
    NEW: 'Необработанный',
    PENDING: 'Не обработан более 3 дней',
    VERIFIED: 'Обработанный',
    CONFIRMED: 'Подтвержденный'
};