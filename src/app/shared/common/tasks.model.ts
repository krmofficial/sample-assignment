export interface Task {
    assignedToUser: string;
    status: string;
    dueDate:Date | string;
    priority: string;
    comment: string;
}

export interface ManageTask {
    id: number;
    assignedToUser: string;
    status: string;
    dueDate:Date | string;
    priority: string;
    comment: string;
}