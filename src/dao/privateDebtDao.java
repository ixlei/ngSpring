package dao;


import model.privateDebt;

import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

@SuppressWarnings("deprecation")
public class privateDebtDao {
	private SimpleJdbcTemplate jdbcTemplate;
	
	public void setJdbcTemplate(SimpleJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public SimpleJdbcTemplate getJdbcTemplate() {
		return this.jdbcTemplate;
	}
	
	public privateDebtDao () {
		
	}
	
	public void insert(privateDebt customer) {
		String sql = "insert into privatedebt (publishMoneyMin, publishMoneyMax, publishFixedYesrs, publishFinsh, occupyMaxInterestMin, "
				+ "occupyMaxInterestMax, netAsset, returnMoneyWay, turnover, riskCotrollRequest, netProfit, "
				+ "bondsman, customer, time, occupyTime, returnSource) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		jdbcTemplate.update(sql, customer.getPubMoneyMin(), customer.getPubMoneyMax(), customer.getPubFixedYesrs(),
				customer.getPubFinsh(), customer.getoccupyMaxInterestMin(), customer.getoccupyMaxInterestMax(), customer.getNetAsset(),
				customer.getReturnMoneyWay(), customer.getTurnover(), customer.getRiskControllReq(), customer.getNetProfit(),
				 customer.getbondsman(),customer.getCustomer(), customer.getTime(), customer.getOccupyTime(), customer.getReturnSource());
	}
}
