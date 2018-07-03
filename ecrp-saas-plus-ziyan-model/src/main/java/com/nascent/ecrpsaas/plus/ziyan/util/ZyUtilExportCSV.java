package com.nascent.ecrpsaas.plus.ziyan.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;

import com.nascent.ecrpsaas.base.util.UtilString;
import com.nascent.plugins.jfinal.activerecord.Record;

public class ZyUtilExportCSV {
	/**
	 * 生成为CVS文件
	 * 
	 * @param exportData
	 *            源数据List
	 * @param map
	 *            csv文件的列表头map
	 * @param outPutPath
	 *            文件路径
	 * @param fileName
	 *            文件名称
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static File createCSVFile(List<Record> exportData, LinkedHashMap<String, String> map, String outPutPath,
			String fileName) throws Exception {
		File csvFile = null;
		BufferedWriter csvFileOutputStream = null;
		try {

			File file = new File(outPutPath);
			if (!file.exists()) {
				file.mkdirs();
			}
			// 定义文件名格式并创建
			csvFile = new File(outPutPath + "/" + fileName + ".csv");
			csvFile.createNewFile();
			System.out.println("csvFile：" + csvFile);
			/**解决表头乱码*/
			 FileOutputStream fos = new FileOutputStream(csvFile);  
			 fos.write(new byte[]{(byte)0xEF, (byte)0xBB, (byte)0xBF});  
			 OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");  
			  csvFileOutputStream = new BufferedWriter(osw,1024);
			
			// UTF-8使正确读取分隔符","
			/*csvFileOutputStream = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(csvFile), "UTF-8"),
					1024);*/
			System.out.println("csvFileOutputStream：" + csvFileOutputStream);
			// 写入文件头部
			for (Iterator propertyIterator = map.entrySet().iterator(); propertyIterator.hasNext();) {
				java.util.Map.Entry propertyEntry = (java.util.Map.Entry) propertyIterator.next();
				csvFileOutputStream.write("\"" + (String) propertyEntry.getValue() != null
						? (String) propertyEntry.getValue() : "" + "\"");
				if (propertyIterator.hasNext()) {
					csvFileOutputStream.write(",");
				}
			}
			csvFileOutputStream.newLine();
			// 写入文件内容
			for (Iterator iterator = exportData.iterator(); iterator.hasNext();) {
				Record row = (Record)iterator.next();
				for (Iterator propertyIterator = map.entrySet().iterator(); propertyIterator.hasNext();) {
					java.util.Map.Entry propertyEntry = (java.util.Map.Entry) propertyIterator.next();
					String value = row.get((String) propertyEntry.getKey())+"\t";
					csvFileOutputStream.write((UtilString.isEmpty(value) || "null\t".equals(value)) ? "" : value);
					if (propertyIterator.hasNext()) {
						csvFileOutputStream.write(",");
					}
				}
				if (iterator.hasNext()) {
					csvFileOutputStream.newLine();
				}
			}
			csvFileOutputStream.flush();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		} finally {
			try {
				csvFileOutputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return csvFile;
	}

	/**
	 * 下载文件
	 * 
	 * @param response
	 * @param csvFilePath
	 *            文件路径
	 * @param fileName
	 *            文件名称
	 * @throws IOException
	 */
	public static void exportFile(HttpServletResponse response, String csvFilePath, String fileName)
			throws IOException {
		response.setContentType("application/csv;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "UTF-8"));

		InputStream in = null;
		try {
			in = new FileInputStream(csvFilePath);
			int len = 0;
			byte[] buffer = new byte[1024];
			response.setCharacterEncoding("UTF-8");
			OutputStream out = response.getOutputStream();
			while ((len = in.read(buffer)) > 0) {
				out.write(new byte[] { (byte) 0xEF, (byte) 0xBB, (byte) 0xBF });
				out.write(buffer, 0, len);
			}
		} catch (FileNotFoundException e) {
			System.out.println(e);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			}
		}
	}

	/**
	 * 删除该目录filePath下的所有文件
	 * 
	 * @param filePath
	 *            文件目录路径
	 */
	public static void deleteFiles(String filePath) {
		File file = new File(filePath);
		if (file.exists()) {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				if (files[i].isFile()) {
					files[i].delete();
				}
			}
		}
	}

	/**
	 * 删除单个文件
	 * 
	 * @param filePath
	 *            文件目录路径
	 * @param fileName
	 *            文件名称
	 */
	public static void deleteFile(String filePath, String fileName) {
		File file = new File(filePath);
		if (file.exists()) {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				if (files[i].isFile()) {
					if (files[i].getName().equals(fileName)) {
						files[i].delete();
						return;
					}
				}
			}
		}
	}
}
