interface ApiResponse<T> {
    status: boolean;
    data?: T;
    error?: string;
}