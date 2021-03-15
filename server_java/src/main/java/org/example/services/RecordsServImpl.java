package org.example.services;

import org.example.dao.RecordsDao;
import org.example.pojo.RecordsAssetsEntity;
import org.example.pojo.RecordsGamesEntity;
import org.example.util.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RecordsServImpl implements IRecordsServ {
    @Autowired
    private RecordsDao dao;

    @Override
    public String createRecordsGames(String playerId, RecordsGamesEntity records){
        String guid = Tools.getUuid();
        long timestamp = Tools.getTimeMillis(Tools.getNowDate());
        return dao.insertRecordsGamesExec(playerId, guid, Long.toString(timestamp), records);
    }

    @Override
    public List<Map<String, Object>> getRecordsGames(String playerId, String start, String end){
        return dao.selectRecordsGamesExec(playerId, start, end);
    }

    @Override
    public String deleteRecordsGames(String guid) {
        return dao.deleteRecordsGamesExec(guid);
    }

    @Override
    public Map<String, Object> getRecordsIncome(String playerId, String start, String end){
        return dao.selectRecordsIncomeExec(playerId, start, end);
    }

    @Override
    public String createRecordsGolds(String playerId, RecordsAssetsEntity records) {
        String guid = Tools.getUuid();
        long timestamp = Tools.getTimeMillis(Tools.getNowDate());
        return dao.insertRecordsGoldsExec(playerId, guid, Long.toString(timestamp), records);
    }

    @Override
    public String createRecordsBeans(String playerId, RecordsAssetsEntity records) {
        String guid = Tools.getUuid();
        long timestamp = Tools.getTimeMillis(Tools.getNowDate());
        return dao.insertRecordsBeansExec(playerId, guid, Long.toString(timestamp), records);
    }

    @Override
    public List<Map<String, Object>> getRecordsGolds(String playerId) {
        return dao.selectRecordsGoldsExec(playerId);
    }

    @Override
    public List<Map<String, Object>> getRecordsBeans(String playerId) {
        return dao.selectRecordsBeansExec(playerId);
    }

    @Override
    public String deleteRecordsGolds(String guid) {
        return dao.deleteRecordsGoldsExec(guid);
    }

    @Override
    public String deleteRecordsBeans(String guid) {
        return dao.deleteRecordsBeansExec(guid);
    }
}
