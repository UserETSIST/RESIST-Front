export interface ContactFormData {
    success: Boolean,
    data: {
        id: number | null,
        name: string,
        email: string,
        phone: string,
        message: string,
        created_at: string
    }
}

