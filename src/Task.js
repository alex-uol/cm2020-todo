/** list of values of priority */
export const Priority = Object.freeze({
  low: "low",
  /**default value */
  medium: "medium",
  high: "high",
});

/** list of values of task status*/
export const Status = Object.freeze({
  /**default value*/
  inactive: "Inactive",
  /**active task */
  active: "Active",
  /**completed task */
  completed: "Completed",
  /**deleted task */
  trashed: "Trashed",
});

/**Class of sub task*/
export class SubTask {
  /**returns a sub task object
   * @param {string} [title=""] title of task
   * @param {string} [description=""] description of task
   */
  constructor(title = "", description = "") {
    /**id of this sub task */
    this.id = Date.now();
    this.title = title;
    this.description = description;
    /**completion flag of task */
    this.completed = false;
  }
}

/** Class of task, child of class SubTask*/
export class Task {
  /** creates an empty task
   * @param {string} title task title
   * @param {string} description task description
   */
  constructor(title = "", description = "") {
    /**id of this task, assigned with it's creation time
     * @type {number}
     */
    this.id = null;
    /**@type {string}*/
    this.title = title;
    /**@type {string}*/
    this.description = description;
    /**list of sub task object
     * @type {SubTask[]}
     */
    this.subTasks = [];
    /**progress rate, 0~100
     * @type {number}
     */
    this.progress = 0;
    /**due date in time format string
     * @type {string}
     */
    this.dueDate = "";
    /**priority of this task, set this with values from Priority
     * @type {string}
     * @example taskA.priority = Priority.low;
     */
    this.priority = Priority.medium;
    /**list of ids of tags added to this task
     * @type {number[]}
     */
    this.tags = [];
    /**id of category of this task
     * @type {string}
     */
    this.category = -1;
    /**status of this task, set this with values from Status
     * @type {number}
     * @example taskA.status = Status.completed
     */
    this.status = Status.inactive;
  }
}
