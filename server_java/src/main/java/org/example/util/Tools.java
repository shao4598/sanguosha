package org.example.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.NoSuchMessageException;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;


/**
 * . 工具类
 *
 * @author w15579
 */
public class Tools {
    private static final char[] HEX_DIGITS = "0123456789abcdef".toCharArray();
    private static final char[] CHAR_ARRAY = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();

    /**
     * @param str 待加密字符串
     * @return 返回MD5码
     * @Title: getMD5
     * @Description: MD5生成类
     * @since v1.0.0
     */
    public static String getMD5(String str) {
        try {
            // 生成一个MD5加密计算摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 计算md5函数
            md.update(str.getBytes());
            // digest()最后确定返回md5 hash值，返回值为8为字符串。因为md5 hash值是16位的hex值，实际上就是8位的字符
            // BigInteger函数则将8位的字符串转换成16位hex值，用字符串来表示；得到字符串形式的hash值
            String md5code = new BigInteger(1, md.digest()).toString(16);
            for (int i = 0; i < 32 - md5code.length(); i++) {
                md5code = "0" + md5code;
            }
            return md5code;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 生成MD5串 一个文件
     * @param file 文件
     * @return MD5Str
     * @throws NoSuchAlgorithmException
     * @throws IOException
     */
    public static String getMD5FromFile(File file) throws NoSuchAlgorithmException,IOException{
        MessageDigest md = MessageDigest.getInstance("MD5");
        InputStream fis;
        fis = new FileInputStream(file);
        byte[] buffer = new byte[1024];
        int numRead = 0;
        while ((numRead = fis.read(buffer)) > 0) {
            md.update(buffer, 0, numRead);
        }
        fis.close();
        return toHex(md.digest());
    }
    private static String toHex(byte[] bytes){
        char[] chs = new char[bytes.length * 2];
        for(int i = 0, offset = 0; i < bytes.length; i++) {
            chs[offset++] = HEX_DIGITS[bytes[i] >> 4 & 0xf];
            chs[offset++] = HEX_DIGITS[bytes[i] & 0xf];
        }
        return String.valueOf(chs);
    }

    /**
     * .
     * 获取UUID Tools.getInstance().getUuid()
     *
     * @return uuid
     */
    public static final String getUuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * @param request 请求
     * @return 返回IP地址
     * @Title: getIpAddr
     * @Description: 获取IP地址
     * @since v1.0.9
     */
    public static String getIpAddr(HttpServletRequest request) {
        if (request == null) {
            return "unknown";
        }
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        ip = "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
        return ip;
    }

    /**
     * 获取操作系统和浏览器信息
     *
     * @param request 请求
     * @return 操作系统和浏览器信息
     */
    public static String getOsAndBrowserInfo(HttpServletRequest request) {
        String browserDetails = request.getHeader("User-Agent");
        String userAgent = browserDetails;
        String user = userAgent.toLowerCase();

        String os = "";
        String browser = "";

        //=================OS Info=======================
        if (userAgent.toLowerCase().indexOf("windows") >= 0) {
            os = "Windows";
        } else if (userAgent.toLowerCase().indexOf("mac") >= 0) {
            os = "Mac";
        } else if (userAgent.toLowerCase().indexOf("x11") >= 0) {
            os = "Unix";
        } else if (userAgent.toLowerCase().indexOf("android") >= 0) {
            os = "Android";
        } else if (userAgent.toLowerCase().indexOf("iphone") >= 0) {
            os = "IPhone";
        } else {
            os = "UnKnown, More-Info: " + userAgent;
        }
        //===============Browser===========================
        if (user.contains("edge")) {
            browser = (userAgent.substring(userAgent.indexOf("Edge")).split(" ")[0]).replace("/", "-");
        } else if (user.contains("msie")) {
            String substring = userAgent.substring(userAgent.indexOf("MSIE")).split(";")[0];
            browser = substring.split(" ")[0].replace("MSIE", "IE") + "-" + substring.split(" ")[1];
        } else if (user.contains("safari") && user.contains("version")) {
            browser = (userAgent.substring(userAgent.indexOf("Safari")).split(" ")[0]).split("/")[0]
                    + "-" + (userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
        } else if (user.contains("opr") || user.contains("opera")) {
            if (user.contains("opera")) {
                browser = (userAgent.substring(userAgent.indexOf("Opera")).split(" ")[0]).split("/")[0]
                        + "-" + (userAgent.substring(userAgent.indexOf("Version")).split(" ")[0]).split("/")[1];
            } else if (user.contains("opr")) {
                browser = ((userAgent.substring(userAgent.indexOf("OPR")).split(" ")[0]).replace("/", "-"))
                        .replace("OPR", "Opera");
            }

        } else if (user.contains("chrome")) {
            browser = (userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0]).replace("/", "-");
        } else if ((user.indexOf("mozilla/7.0") > -1) || (user.indexOf("netscape6") != -1)
                || (user.indexOf("mozilla/4.7") != -1) || (user.indexOf("mozilla/4.78") != -1)
                || (user.indexOf("mozilla/4.08") != -1) || (user.indexOf("mozilla/3") != -1)) {
            browser = "Netscape-?";

        } else if (user.contains("firefox")) {
            browser = (userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0]).replace("/", "-");
        } else if (user.contains("rv")) {
            String strIEVersion = (userAgent.substring(userAgent.indexOf("rv")).split(" ")[0]).replace("rv:", "-");
            browser = "IE" + strIEVersion.substring(0, strIEVersion.length() - 1);
        } else {
            browser = "UnKnown, More-Info: " + userAgent;
        }

        return os + "-" + browser;
    }

    /**
     * 获取多语言翻译
     *
     * @param strKey  key
     * @param request 请求
     * @return 返回多语言翻译
     * @Title: getI18nByKey
     * @Description: 获取多语言翻译
     * @since v1.0.0
     */
    public String getI18nByKey(String strKey, HttpServletRequest request) {
        RequestContext requestContext = new RequestContext(request);
        String strCode = "useCodeAsDefaultMessage";
        try {
            if (!"".equals(strKey) && strKey != null) {
                strCode = requestContext.getMessage(strKey);
            }
        } catch (NoSuchMessageException e) {
            return strCode;
        }
        return strCode;
    }

    /**
     * .
     *
     * @param args 参数说明
     * @Title: main
     * @since v1.0.0
     */
    public static void main(String[] args) {
    }

    /**
     * 获取服务端IP
     *
     * @return 参数说明
     * @Title: getServIP
     * @Description: 获取服务端IP
     * @since v1.0.0
     */
    @SuppressWarnings("rawtypes")
    public static String getServIP() {
        InetAddress ip = null;
        String strIP = null;
        try {
            Enumeration allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                //System.out.println(netInterface.getName());
                Enumeration addresses = netInterface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    ip = (InetAddress) addresses.nextElement();
                    if (ip != null && ip instanceof Inet4Address) {
                        System.out.println("本机的IP = " + ip.getHostAddress());
                    }
                    if (!ip.isLinkLocalAddress() && !ip.isLoopbackAddress() && ip instanceof Inet4Address) {
                        strIP = ip.toString().replaceAll("/", "");
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return strIP;
    }

    /**
     * 获取服务端IP集合
     *
     * @return 参数说明
     * @Title: getServIPs
     * @Description: 获取服务端IP集合
     * @since v1.0.0
     */
    @SuppressWarnings("rawtypes")
    public static Map<String, String> getServIPs() {
        Map<String, String> map = new HashMap<String, String>();
        InetAddress ip = null;
        try {
            Enumeration allNetInterfaces = NetworkInterface.getNetworkInterfaces();
            while (allNetInterfaces.hasMoreElements()) {
                NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
                //System.out.println(netInterface.getName());
                Enumeration addresses = netInterface.getInetAddresses();
                while (addresses.hasMoreElements()) {
                    ip = (InetAddress) addresses.nextElement();
                    if (ip != null && ip instanceof Inet4Address) {
                        map.put(ip.getHostAddress(), ip.getHostAddress());
                    }
                    if (!ip.isLinkLocalAddress() && !ip.isLoopbackAddress() && ip instanceof Inet4Address) {
                        map.put(ip.toString().replaceAll("/", ""), ip.toString().replaceAll("/", ""));
                        return map;
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return map;
    }

    /**
     * 处理包含逗号，或者双引号的字段
     *
     * @param str 要处理的字符串
     * @return 处理后的字符串
     */
    public static String csvHandlerStr(String str) {
        String tempDescription = str;
        if (null != str) {
            if (str.contains("\"")) {
                tempDescription = str.replace("\"", "\"\"");
            }
            tempDescription = "\"" + tempDescription + "\"";
        }
        return tempDescription;
    }

   public static String getNowDate(){
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }
    /**
     * 时间转时间戳
     * @param date 时间字符串
     * @return 时间戳
     */
    public static long getTimeMillis(String date){
        String newDate = StringUtils.isNotBlank(date) ? date : Tools.getNowDate() +"";
        return (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(newDate, new ParsePosition(0)).getTime() / 1000;
    }
}
