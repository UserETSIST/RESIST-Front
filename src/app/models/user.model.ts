export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    is_admin: boolean;
    is_active: boolean;
    email_is_verified: boolean;
    created_at: string; 
    updated_at: string; 
}

