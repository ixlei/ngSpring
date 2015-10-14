package dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

import model.photoUpload;

@SuppressWarnings("deprecation")
public class photoDao {

	private SimpleJdbcTemplate jdbcTemplate;

	public void setjdbcTemplate(SimpleJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public SimpleJdbcTemplate getjdbcTemplate() {
		return this.jdbcTemplate;
	}

	public void insertPhoto(List<photoUpload> photos) {
		String sql = "insert into photos(customer, imageName) values(?, ?)";
		List<Object[]> list = new ArrayList<Object[]>();

		for (int i = 0; i < photos.size(); i++) {
			String customer = photos.get(i).getCustomer();
			String imageName = photos.get(i).getImageName();
			Object[] objects = new Object[] { customer, imageName };
			list.add(objects);
		}
		jdbcTemplate.batchUpdate(sql, list);
	}
}
