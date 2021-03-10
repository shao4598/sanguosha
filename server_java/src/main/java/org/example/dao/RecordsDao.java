package org.example.dao;

import org.example.pojo.RecordsAssetsEntity;
import org.example.pojo.RecordsGamesEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RecordsDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public String insertRecordsGamesExec(String playerId, String guid, String timestamp, RecordsGamesEntity records) {
        try {
            String sql = "INSERT INTO records_games (guid, player_id, room, landlord, farmer1, farmer2, is_win, role, multiple, golds, beans, is_flee, remarks, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, guid, playerId, records.getRoom(), records.getLandlord(), records.getFarmer1(), records.getFarmer2(), records.getIsWin(), records.getRole(), records.getMultiple(), records.getGolds(), records.getBeans(), records.getIsFlee(), records.getRemarks(), timestamp);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public List<Map<String, Object>> selectRecordsGamesExec(String playerId, String start, String end) {
        String sql = "SELECT * FROM records_games WHERE player_id = ? AND timestamp > ? AND timestamp < ?";
        return jdbcTemplate.queryForList(sql, playerId, start, end);
    }

    public String deleteRecordsGamesExec(String guid){
        try {
            String sql = "DELETE FROM records_games WHERE guid = ?";
            jdbcTemplate.update(sql, guid);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public Map<String, Object> selectRecordsIncomeExec(String playerId, String start, String end) {
        String sql = "SELECT SUM(beans) AS beans, SUM(golds) AS golds FROM records_games WHERE player_id = ? AND timestamp >= ? AND timestamp<= ?";
        return jdbcTemplate.queryForMap(sql, playerId, start, end);
    }

    public String insertRecordsGoldsExec(String playerId, String guid, String timestamp, RecordsAssetsEntity records) {
        try {
            String sql = "INSERT INTO records_golds (guid, player_id, count, mode, timestamp) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, guid, playerId, records.getCount(), records.getMode(), timestamp);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public String insertRecordsBeansExec(String playerId, String guid, String timestamp, RecordsAssetsEntity records) {
        try {
            String sql = "INSERT INTO records_beans (guid, player_id, count, mode, timestamp) VALUES (?, ?, ?, ?, ?)";
            jdbcTemplate.update(sql, guid, playerId, records.getCount(), records.getMode(), timestamp);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public List<Map<String, Object>> selectRecordsGoldsExec(String playerId) {
        String sql = "SELECT * FROM records_golds WHERE player_id = ?";
        return jdbcTemplate.queryForList(sql, playerId);
    }

    public List<Map<String, Object>> selectRecordsBeansExec(String playerId) {
        String sql = "SELECT * FROM records_beans WHERE player_id = ?";
        return jdbcTemplate.queryForList(sql, playerId);
    }

    public String deleteRecordsGoldsExec(String guid){
        try {
            String sql = "DELETE FROM records_golds WHERE guid = ?";
            jdbcTemplate.update(sql, guid);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public String deleteRecordsBeansExec(String guid){
        try {
            String sql = "DELETE FROM records_beans WHERE guid = ?";
            jdbcTemplate.update(sql, guid);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }
}
