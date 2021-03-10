package org.example.services;

import org.example.pojo.RecordsAssetsEntity;
import org.example.pojo.RecordsGamesEntity;

import java.util.List;
import java.util.Map;

public interface IRecordsServ {
    String createRecordsGames(String playerId, RecordsGamesEntity records);

    List<Map<String, Object>> getRecordsGames(String playerId, String start, String end);

    String deleteRecordsGames(String guid);

    Map<String, Object> getRecordsIncome(String playerId, String start, String end);

    String createRecordsGolds(String playerId, RecordsAssetsEntity records);

    String createRecordsBeans(String playerId, RecordsAssetsEntity records);

    List<Map<String, Object>> getRecordsGolds(String playerId);

    List<Map<String, Object>> getRecordsBeans(String playerId);

    String deleteRecordsGolds(String guid);

    String deleteRecordsBeans(String guid);
}
