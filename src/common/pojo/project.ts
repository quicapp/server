import { Item } from "./item";

// The parent of a project is a user (for the time being)
class Project extends Item{
    public name: String;
    public framework: String;
    public library: String;
}

// The parent of a page is a project
class Page extends Item{

}

export { Project, Page }