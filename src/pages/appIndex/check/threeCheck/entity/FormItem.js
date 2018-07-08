import param from "@/config/Util/Param"
class Item {
  constructor() {
    this.formItemList = [
      {
        label: "年度",
        prop: "year",
        type: "dateYear"
      },
      {
        label: "季度",
        prop: "seasons",
        type: "select",
        width: 200,
        options: {
          list: param.performanceScore.season,
          label:"name",
          value:"id",
          multiple: true
        }
      },
      {
      label: "标段名称",
      prop: "projectStage",
      type: "input"
    },
      {
      label: "受检单位",
      prop: "applicant",
      type: "input"
    }]
  }

  export() {
    return this.formItemList
  }
}
class Search {
  constructor() {
    this.projectStage = "";
    this.applicant = "";
    this.seasons = ["1","2","3","4"];
    this.range="";
    this.year="2017";
    this.constructionStage="";
    this.projectLevel="";

  }
  export() {
    return {
      projectStage: this.projectStage,
      applicant: this.applicant,
      seasons: this.seasons.length == 0 ?["1","2","3","4"] : this.seasons,
      year:this.year,
      constructionStage:this.constructionStage,
      projectLevel:this.projectLevel,
      range:this.range,

    }
  }
}
export const FormItem = () => {
  return new Item()
}
export const SearchForm = () => {
  return new Search()
}
