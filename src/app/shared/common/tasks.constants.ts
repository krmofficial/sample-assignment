export class TasksConstants {
    public static status =  [
        {id: 1, name: "Not Started", value: "notStarted"},
        {id: 2, name: "In Progress", value: "inProgress"},
        {id: 3, name: "Completed", value: "completed"},
    ];

    public static priority = [
        {id: 1, name: "Low", value: "Low"},
        {id: 2, name: "High", value: "High"},
        {id: 3, name: "Normal", value: "Normal"},
    ];

    public static users = [
        {id: 1, name: "User 1", value: "user1"},
        {id: 2, name: "User 2", value: "user2"},
        {id: 3, name: "User 3", value: "user3"},
        {id: 4, name: "User 4", value: "user4"},
    ];

    public static taskList = "taskList";
}