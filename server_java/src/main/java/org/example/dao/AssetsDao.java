package org.example.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class AssetsDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> selectNowGoldsExec(String playerId) {
        String sql = "SELECT now_golds FROM assets WHERE player_id = ?";
        return jdbcTemplate.queryForMap(sql, playerId);
    }

    public Map<String, Object> selectNowBeansExec(String playerId) {
        String sql = "SELECT now_beans FROM assets WHERE player_id = ?";
        return jdbcTemplate.queryForMap(sql, playerId);
    }

    public String updateGoldsExec(String playerId, String golds) {
        try {
            String sql = "UPDATE assets SET now_golds = ? WHERE player_id = ?";
            jdbcTemplate.update(sql, golds, playerId);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public String updateBeansExec(String playerId, String beans) {
        try {
            String sql = "UPDATE assets SET now_beans = ? WHERE player_id = ?";
            jdbcTemplate.update(sql, beans, playerId);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }

    public String updateAssetExec(String playerId, String golds, String beans) {
        try {
            String sql = "UPDATE assets SET now_beans = ?, now_golds = ? WHERE player_id = ?";
            jdbcTemplate.update(sql, beans, golds, playerId);
        } catch (Exception e) {
            e.printStackTrace();
            return "-1";
        }
        return "0";
    }
}
