package org.example.services;

public interface IAssetsServ {
    String getNowGolds(String playerId);

    String getNowBeans(String playerId);

    String updateGolds(String playerId, String golds);

    String updateBeans(String playerId, String beans);

    String updateAsset(String playerId, String golds, String beans);
}
