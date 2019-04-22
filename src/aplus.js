export const parse = $ => {
  const modules = $("#aplus .aplus-module").length;
  const module_sort = $("#aplus .aplus-module")
    .map(function(index, div) {
      return $(div).attr("cel_widget_id");
    })
    .get();

  return {
    modules,
    module_sort
  };
};

export const expectation = {
  "aplus.html": {
    modules: 4,
    module_sort: [
      "aplus-module-1",
      "aplus-module-9",
      "aplus-module-5",
      "aplus-module-5"
    ]
  }
};
