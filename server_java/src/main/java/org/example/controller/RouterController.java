package org.example.controller;

import com.alibaba.fastjson.JSONObject;
import org.example.pojo.RecordsAssetsEntity;
import org.example.pojo.RecordsGamesEntity;
import org.example.services.IAssetsServ;
import org.example.services.IRecordsServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class RouterController {
    @Autowired
    private IRecordsServ recordServ;

    @Autowired
    private IAssetsServ assetsServ;

    @RequestMapping("/")
    public String getHello(){
        return "index";
    }

    @GetMapping("/records/games/{playerId}")
    @ResponseBody
    public JSONObject getRecordsGames(@PathVariable("playerId") String playerId, @RequestParam(value="start") String start, @RequestParam(value="end") String end){
        List<Map<String, Object>> list = recordServ.getRecordsGames(playerId, start, end);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", list);
        return resData;
    }

    @PostMapping("/records/games/{playerId}")
    @ResponseBody
    public JSONObject createRecordsGames( @PathVariable("playerId") String playerId, @RequestBody RecordsGamesEntity records){
        String status = recordServ.createRecordsGames(playerId, records);
        if(status.equals("0")){
            String oldGolds = assetsServ.getNowGolds(playerId);
            String oldBeans = assetsServ.getNowBeans(playerId);
            int newGolds = Integer.parseInt(oldGolds) + Integer.parseInt(records.getGolds());
            int newBeans = Integer.parseInt(oldBeans) + Integer.parseInt(records.getBeans());
            status = assetsServ.updateAsset(playerId, Integer.toString(newGolds), Integer.toString(newBeans));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", status);
        return resData;
    }

    @DeleteMapping("/records/games/{playerId}")
    @ResponseBody
    public JSONObject deleteRecordsGames( @PathVariable("playerId") String playerId, @RequestParam(value="guid") String guid, @RequestParam(value="golds") String golds, @RequestParam(value="beans") String beans){
        String status = recordServ.deleteRecordsGames(guid);
        if(status.equals("0")){
            String oldGolds = assetsServ.getNowGolds(playerId);
            String oldBeans = assetsServ.getNowBeans(playerId);
            int newGolds = Integer.parseInt(oldGolds) - Integer.parseInt(golds);
            int newBeans = Integer.parseInt(oldBeans) - Integer.parseInt(beans);
            status = assetsServ.updateAsset(playerId, Integer.toString(newGolds), Integer.toString(newBeans));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", status);
        return resData;
    }

    @GetMapping("/assets/golds/{playerId}")
    @ResponseBody
    public JSONObject getAssetsGames(@PathVariable("playerId") String playerId){
        String golds = assetsServ.getNowGolds(playerId);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", golds);
        return resData;
    }

    @GetMapping("/assets/beans/{playerId}")
    @ResponseBody
    public JSONObject getAssetsBeans(@PathVariable("playerId") String playerId){
        String beans = assetsServ.getNowBeans(playerId);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", beans);
        return resData;
    }

    @GetMapping("/records/income/{playerId}")
    @ResponseBody
    public JSONObject getIncome(@PathVariable("playerId") String playerId, @RequestParam(value="start") String start, @RequestParam(value="end") String end){
        Map<String, Object> list = recordServ.getRecordsIncome(playerId, start, end);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", list);
        return resData;
    }

    @PostMapping("/records/golds/{playerId}")
    @ResponseBody
    public JSONObject createRecordsGolds(@PathVariable("playerId") String playerId, @RequestBody RecordsAssetsEntity records){
        String status = recordServ.createRecordsGolds(playerId, records);
        if(status.equals("0")){
            String oldGolds = assetsServ.getNowGolds(playerId);
            int newGolds = Integer.parseInt(oldGolds) - Integer.parseInt(records.getCount());
            status = assetsServ.updateGolds(playerId, Integer.toString(newGolds));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", status);
        return resData;
    }

    @PostMapping("/records/beans/{playerId}")
    @ResponseBody
    public JSONObject createRecordsBeans(@PathVariable("playerId") String playerId, @RequestBody RecordsAssetsEntity records){
        String status = recordServ.createRecordsBeans(playerId, records);
        if(status.equals("0")){
            String oldBeans = assetsServ.getNowBeans(playerId);
            int newBeans = Integer.parseInt(oldBeans) + Integer.parseInt(records.getCount());
            status = assetsServ.updateBeans(playerId, Integer.toString(newBeans));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", status);
        return resData;
    }

    @GetMapping("/records/golds/{playerId}")
    @ResponseBody
    public JSONObject getRecordsGolds(@PathVariable("playerId") String playerId){
        List<Map<String, Object>> list = recordServ.getRecordsGolds(playerId);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", list);
        return resData;
    }

    @GetMapping("/records/beans/{playerId}")
    @ResponseBody
    public JSONObject getRecordsBeans(@PathVariable("playerId") String playerId){
        List<Map<String, Object>> list = recordServ.getRecordsBeans(playerId);
        JSONObject resData = new JSONObject();
        resData.put("status", "0");
        resData.put("data", list);
        return resData;
    }

    @DeleteMapping("/records/golds/{playerId}")
    @ResponseBody
    public JSONObject deleteRecordsGolds( @PathVariable("playerId") String playerId, @RequestParam(value="guid") String guid, @RequestParam(value="golds") String golds){
        String status = recordServ.deleteRecordsGolds(guid);
        if(status.equals("0")){
            String oldGolds = assetsServ.getNowGolds(playerId);
            int newGolds = Integer.parseInt(oldGolds) + Integer.parseInt(golds);
            status = assetsServ.updateGolds(playerId, Integer.toString(newGolds));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", status);
        return resData;
    }

    @DeleteMapping("/records/beans/{playerId}")
    @ResponseBody
    public JSONObject deleteRecordsBeans( @PathVariable("playerId") String playerId, @RequestParam(value="guid") String guid, @RequestParam(value="beans") String beans){
        String status = recordServ.deleteRecordsBeans(guid);
        if(status.equals("0")){
            String oldBeans = assetsServ.getNowBeans(playerId);
            int newBeans = Integer.parseInt(oldBeans) - Integer.parseInt(beans);
            status = assetsServ.updateBeans(playerId, Integer.toString(newBeans));
        }
        JSONObject resData = new JSONObject();
        resData.put("status", status);
        return resData;
    }
}