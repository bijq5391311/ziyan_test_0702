package com.nascent.ecrpsaas.open.ziyan.model.vo;

/**
 * @author FeiXiang
 * @date 2017/12/22
 * @describe 带分页的列表Vo
 */
public class PageWithListVo {
    private Integer pageSize;
    private Integer currentPage;
    private String hasNextPage;
    private Object result;

    public PageWithListVo() {
    }

    public PageWithListVo(int page, int pageSize, long count, Object result) {
        this.currentPage = page;
        this.pageSize = pageSize;
        this.result = result;
        if (count > page * pageSize) {
            hasNextPage = "true";
        } else {
            hasNextPage = "false";
        }
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }

    public String getHasNextPage() {
        return hasNextPage;
    }

    public void setHasNextPage(String hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
