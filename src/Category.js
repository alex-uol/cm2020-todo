/**class of category*/
export class Category
{
    constructor(title = "")
    {
        /**id of this category
         * @type {number}
         */
        this.id = -1;
        /**category title
         * @type {string}
         */
        this.title = title;
        /** list of id of tasks belongs to this category
         * @type {number[]}
         */
        this.tasks = [];
    }
}

/**class of tag*/
export class Tag
{
    constructor(name = "")
    {
        /**id of this tag
         * @type {number}
         */
        this.id = -1;
        /**tag name
         * @type {string}
         */
        this.name = name;
        /**hexadecimal value of colour of tag 
         * @type {string}
        */
        this.colour = "#aaaaaa";

        /** list of id of tasks with this tag
         * @type {number[]}
         */
        this.tasks = [];
    }
}