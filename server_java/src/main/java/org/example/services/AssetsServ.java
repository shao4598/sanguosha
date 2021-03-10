package org.example.services;

import org.example.dao.AssetsDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetsServ implements IAssetsServ {
    @Autowired
    private AssetsDao dao;

    @Override
    public String getNowGolds(String playerId){
         return dao.selectNowGoldsExec(playerId).get("now_golds").toString();
    }

    @Override
    public String getNowBeans(String playerId){
        return dao.selectNowBeansExec(playerId).get("now_beans").toString();
    }

    @Override
    public String updateGolds(String playerId, String golds){
        return dao.updateGoldsExec(playerId, golds);
    }

    @Override
    public String updateBeans(String playerId, String beans){
        return dao.updateBeansExec(playerId, beans);
    }

    @Override
    public String updateAsset(String playerId, String golds, String beans) {
        return dao.updateAssetExec(playerId, golds, beans);
    }
}
