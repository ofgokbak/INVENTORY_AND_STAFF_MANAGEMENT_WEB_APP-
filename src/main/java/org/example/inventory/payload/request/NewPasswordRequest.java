package org.example.inventory.payload.request;

public class NewPasswordRequest {
    private String currentOne;
    private String newOne;

    public NewPasswordRequest(String currentOne, String newOne) {
        this.currentOne = currentOne;
        this.newOne = newOne;
    }

    public String getCurrentOne() {
        return currentOne;
    }

    public void setCurrentOne(String currentOne) {
        this.currentOne = currentOne;
    }

    public String getNewOne() {
        return newOne;
    }

    public void setNewOne(String newOne) {
        this.newOne = newOne;
    }
}
