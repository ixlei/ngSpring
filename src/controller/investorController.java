package controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.Investor;
import model.appointment;
import model.companyuser;
import model.debtBuy;
import model.debtDetail;
import model.equity;
import model.stockBuy;
import model.investModel;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import dao.appointmentDao;
import dao.companyuserDao;
import dao.debtBuyDao;
import dao.investorDao;
import dao.stockBuyDao;

@Controller
@RequestMapping("/investor")
public class investorController {

	private ApplicationContext context = new ClassPathXmlApplicationContext(
			"dataSource.xml");
	private investorDao newuser = (investorDao) context.getBean("investor");

	private stockBuyDao stockCus = (stockBuyDao) context.getBean("stockBuy");

	private debtBuyDao debtCus = (debtBuyDao) context.getBean("debtBuy");

	private appointmentDao appCus = (appointmentDao) context
			.getBean("appointment");
	private companyuserDao companyCusDao = (companyuserDao) context
			.getBean("companyuser");

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(HttpServletRequest req, HttpSession session,
			Map<String, String> model) {

		String username = req.getParameter("username");
		String password = req.getParameter("password");

		Investor checkauth = newuser.getInvestorByEmail(username);

		if (checkauth == null) {
			return "redirect:/investor/login";
		}

		if (checkauth.getPassword().equals(password)) {
			session.setAttribute("investor", checkauth);
			return "redirect:/investor/index";
		}
		return "redirect:/investor/login";
	}

	@RequestMapping({ "/", "/index" })
	public String index(HttpServletRequest req, HttpServletResponse res,
			Map<String, Integer> model) {
		model.put("flag", 0);
		res.setHeader("Access-Control-Allow-Origin", "*");
		return "investor/logined-invest-index";
	}

	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session, Map<String, Integer> model) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (session.getAttribute("citiuser") != null) {
			session.setAttribute("citiuser", null);
			map.put("logout", "success");
			return map;
		}
		map.put("logout", "failure");
		return map;
	}

	@RequestMapping("/investModel")
	@ResponseBody
	public Object investModel() {
		Map<String, Object> model = new HashMap<String, Object>();
		ArrayList<investModel> proList;
		try {
			proList = newuser.getInvestModel();
		} catch (Exception e) {
			e.printStackTrace();
			model.put("error", "err");
			return model;
		}
		model.put("pro", proList);

		return model;
	}

	@RequestMapping(value = "/releaseTender", method = RequestMethod.GET)
	@ResponseBody
	public Object releaseTender(HttpSession session) {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("flag", 1);
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		Investor customer;
		try {
			customer = newuser.getInvestorForDebt(email);
		} catch (Exception e) {
			e.printStackTrace();
			model.put("res", "error");
			return model;
		}

		model.put("username", customer.getUsername());
		model.put("investorAddress", customer.getInvestAddress());
		model.put("companyAddress", customer.getCompanyAddress());
		model.put("legalRepresentative", customer.getLegalRepresentative());
		model.put("investFiled", customer.getInvestFiled());
		return model;
	}

	@ResponseBody
	@RequestMapping(value = "/releaseTender", method = RequestMethod.POST)
	public Object releaseTender(HttpServletRequest req) {
		Map<String, String> map = new HashMap<String, String>();
		HttpSession session = req.getSession();
		String citiuser = (String) session.getAttribute("citiuser");

		stockBuy customer = new stockBuy();
		customer.setCustomer(citiuser.split("=")[1]);

		try {
			customer.setInvestmentMin(Integer.parseInt(req
					.getParameter("investmentMin")));
			customer.setInvestmentMax(Integer.parseInt(req
					.getParameter("investmentMax")));
		} catch (Exception e) {
			map.put("res", "Ͷ�ʽ�����");
			return map;
		}

		try {
			customer.setInvestmentTimeOut(Integer.parseInt(req
					.getParameter("investmentTimeOut")));

		} catch (Exception e) {
			map.put("res", "Ͷ�����޴���");
			return map;
		}

		try {
			customer.setInvestmentProportionMin(Integer.parseInt(req
					.getParameter("investmentProportionMin")));
			customer.setInvestmentProportionMax(Integer.parseInt(req
					.getParameter("investmentProportionMax")));
		} catch (Exception e) {
			map.put("res", "Ͷ�ʱ�������");
			return map;
		}

		customer.setInvestmentStage(req.getParameter("investmentStage"));
		customer.setFileProvideRequest(req.getParameter("fileProvideRequest"));
		String investmentRequest = req.getParameter("investmentRequest");
		if (investmentRequest.equals("")) {
			map.put("res", "Ͷ��Ҫ����Ϊ��");
		}
		customer.setInvestmentRequest(investmentRequest);
		String timestamp = new Timestamp(System.currentTimeMillis()).toString();
		int times = timestamp.lastIndexOf(".");
		String time = timestamp.substring(0, times);
		customer.setTime(time);
		try {
			stockCus.insert(customer);
		} catch (Exception e) {
			map.put("res", "�ύʧ�ܣ����������");
			e.printStackTrace();
			return map;
		}
		map.put("res", "�����ɹ�");
		return map;
	}

	@RequestMapping("/appliedInvest")
	public String appliedInvest(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/applied-investment-sign";
	}

	@RequestMapping("/infoCenter")
	public String getInfoCenter(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 0);

		return "investor/info-center";
	}

	@RequestMapping("/infoRecords")
	public String getInfoRecords(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 2);

		return "investor/info-records";
	}

	@RequestMapping("/infoTransform")
	public String getInfoTransform(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 3);

		return "investor/info-transform";
	}

	@RequestMapping("/infoCredit")
	public String getInfoCredit(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 6);

		return "investor/info-credit";
	}

	@RequestMapping("/infoTemporary")
	public String getInfoTemporary(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 5);

		return "investor/info-temporary";
	}

	@RequestMapping("/infoRegular")
	public String getInfoRegular(Map<String, Integer> model) {
		model.put("flag", 2);
		model.put("leftOn", 4);

		return "investor/info-regular";
	}

	@RequestMapping("/resourceAsset")
	public String getResourceAsset(HttpServletRequest req, Model model) {
		HttpSession session = req.getSession();
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		List<Object> user = newuser.getInvestorAll(email);
		model.addAttribute("investor", user);
		return "investor/personal_center_assets_management";
	}

	@RequestMapping("/inews")
	public String inews() {
		return "investor/private_center_my_news_directional";
	}

	@RequestMapping("/directionDown")
	public String getDirectionDown() {
		return "investor/inews-message-direction-down";
	}

	@RequestMapping("/ifollow")
	public String getIFollow() {
		return "investor/personal-attiontion";
	}

	@RequestMapping("/moreInvestor")
	public String getMoreInvestor(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/moreInvestor";
	}

	@RequestMapping(value = "/debtPurchase", method = RequestMethod.GET)
	@ResponseBody
	public Object getDebtPurchase(HttpSession session) {
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		Map<String, Object> model = new HashMap<String, Object>();
		Investor customer;
		try {
			customer = newuser.getInvestorForDebt(email);
		} catch (Exception e) {
			e.printStackTrace();
			model.put("error", "�������");
			return model;
		}

		model.put("username", customer.getUsername());
		model.put("investAddress", customer.getInvestAddress());
		model.put("companyAddress", customer.getCompanyAddress());
		model.put("legalRepresentative", customer.getLegalRepresentative());
		model.put("investFiled", customer.getInvestFiled());
		return model;
	}

	@ResponseBody
	@RequestMapping(value = "/debtPurchase", method = RequestMethod.POST)
	public Object postDebtPurchase(HttpServletRequest req) {

		Map<String, String> map = new HashMap<String, String>();
		HttpSession session = req.getSession(true);
		String email = (String) session.getAttribute("citiuser");
		String customerId = email.split("=")[1];
		debtBuy customer = new debtBuy();
		customer.setCustomer(customerId);

		try {
			customer.setInvestmentMin(Integer.parseInt(req
					.getParameter("investmentMin")));
			customer.setInvestmentMax(Integer.parseInt(req
					.getParameter("investmentMax")));
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "��������ȷ��Ͷ�ʱ���");
			return map;
		}

		try {
			customer.setInvestmentTimeOut(Integer.parseInt(req
					.getParameter("investmentTimeOut")));
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "��������ȷ������");
			return map;
		}

		try {
			customer.setReturnRateMin(Integer.parseInt(req
					.getParameter("returnRateMin")));
			customer.setReturnRateMax(Integer.parseInt(req
					.getParameter("returnRateMax")));
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "������ȷ�Ļر���");
			return map;
		}

		customer.setFileProvideRequest(req.getParameter("fileProviderRequest"));
		customer.setInvestmentRequest(req.getParameter("investmentRequest"));
		customer.setRiskControllRequest(req.getParameter("riskControllRequest"));
		String timestamp = new Timestamp(System.currentTimeMillis()).toString();
		int times = timestamp.lastIndexOf(".");
		String time = timestamp.substring(0, times);
		customer.setTime(time);

		try {
			debtCus.insert(customer);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "����ʧ��!");
			return map;
		}

		map.put("res", "�����ɹ�!");
		return map;

	}

	@RequestMapping("/consulting")
	public String getConsulting() {
		return "investor/consulting";
	}

	@RequestMapping("/infoPolicy")
	public String getInoPolicy(Map<String, Integer> model) {
		model.put("flag", 0);
		return "investor/info-policy";
	}

	@RequestMapping("/infoMarket")
	public String getInfoMarket(Map<String, Integer> model) {
		model.put("falg", 0);
		return "investor/info-market";
	}

	@RequestMapping("/manage")
	public String getManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/investorpatten_survey_of_investment";
	}

	@RequestMapping("/stockManage")
	public String getStockManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/stock-manage";
	}

	@RequestMapping("/stockRightManage")
	public String getStockRightManage(Map<String, Integer> model) {
		model.put("flag", 3);
		return "investor/stockright-manage";
	}

	@RequestMapping("/einquiryProtocol")
	public String getEInquiryProTocol(Map<String, Integer> model) {
		model.put("flag", 1);
		return "investor/eletronic-contrating-inquiry-protocol";
	}

	@RequestMapping("/investorChat")
	@ResponseBody
	public Object getInvestorChat(HttpSession session) {
		Map<String, Object> model = new HashMap<String, Object>();

		model.put("flag", (Integer) 1);
		ArrayList<companyuser> user;
		try {
			user = companyCusDao.getCompanyUserAll();
		} catch (Exception e) {
			e.printStackTrace();
			model.put("err", "error");
			return model;
		}

		ArrayList<Object> list = new ArrayList<Object>();
		for (int i = 0; i < user.size(); i++) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("email", user.get(i).getEmail());
			map.put("companyName", user.get(i).getCompanyName());
			list.add(map);
		}

		model.put("friendList", list);
		String sessionChar = (String) session.getAttribute("citiuser");
		String[] email = sessionChar.split("=");
		model.put("username", newuser.getInvestorByEmail(email[1])
				.getUsername());

		model.put("session", sessionChar);
		return model;
	}

	@RequestMapping(value = "/resavation", method = RequestMethod.GET)
	public String getResavation(HttpServletRequest req,
			Map<String, Object> model) {
		model.put("flag", 1);

		String to = req.getParameter("to");
		model.put("email", to);

		return "investor/service-chat-resavation";
	}

	@ResponseBody
	@RequestMapping(value = "/appointment", method = RequestMethod.POST)
	public Object postResavation(HttpServletRequest req) {
		HttpSession session = req.getSession();
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		appointment app = new appointment();
		Map<String, String> map = new HashMap<String, String>();

		app.setFrom(email);
		app.setTo(req.getParameter("to"));

		String resavationTime = req.getParameter("resavationTime");
		String name = req.getParameter("name");
		String phoneNumber = req.getParameter("phoneNumber");
		System.out.print(resavationTime);
		if (resavationTime.equals("")) {
			map.put("res", "ԤԼʱ�䲻��Ϊ��");
			return map;
		}

		if (name.equals("")) {
			map.put("res", "�������������");
			return map;
		}

		if (phoneNumber.equals("")) {
			map.put("res", "�����ϵ��ʽ����Ϊ��");
			return map;
		}
		app.setReservationTime(resavationTime);
		app.setFromName(name);
		app.setPhoneNumber(phoneNumber);

		String timestamp = new Timestamp(System.currentTimeMillis()).toString();
		int times = timestamp.lastIndexOf(".");
		String time = timestamp.substring(0, times);
		app.setIsFinsh("false");
		app.setPostTime(time);
		try {
			appCus.insert(app);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "ԤԼʧ�ܣ��Ժ�����");
			return map;
		}

		map.put("res", "ԤԼ�ɹ����Ժ�����˺�����ϵ");
		return map;

	}

	@RequestMapping("/privateNews")
	public String getPrivateNews(Map<String, Integer> model) {
		return "investor/private-news";
	}

	@RequestMapping("/newsManagment")
	public String getNewsManagment(HttpSession session, Model model) {
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		List<Object> list = newuser.getInvestorAll(email);
		model.addAttribute("investor", list);
		return "investor/inews-managment";
	}

	@ResponseBody
	@RequestMapping(value = "/toPerfectReg", method = RequestMethod.POST)
	public Object toPerfect(HttpServletRequest req) {
		Map<String, Object> map = new HashMap<String, Object>();
		Investor newCustomer = new Investor();

		HttpSession session = req.getSession();
		String sessionId = (String) session.getAttribute("citiuser");
		String email = sessionId.split("=")[1];
		newCustomer.setEmail(email);

		newCustomer.setContact(req.getParameter("contact"));
		newCustomer.setPosition(req.getParameter("position"));
		try {
			newCustomer.setCapitalFlow(Double.parseDouble(req
					.getParameter("capitalFlow")));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(req.getParameter("capitalFlow"));
			map.put("res", "��������ȷ���ʽ�ֻ��Ϊ����");
			return map;
		}

		newCustomer.setRegisterAddress(req.getParameter("registerAddress"));
		newCustomer.setInvestFiled(req.getParameter("investFiled"));
		newCustomer.setInvestStage(req.getParameter("investStage"));
		newCustomer.setInvestorScale(req.getParameter("investScale"));
		newCustomer.setInvestCycle(Integer.parseInt(req
				.getParameter("investCycle")));
		newCustomer.setInvestAddress(req.getParameter("investAddress"));
		newCustomer.setCompanyName(req.getParameter("companyName"));
		newCustomer.setCompanyAddress(req.getParameter("companyAddress"));

		newCustomer.setLegalRepresentative(req
				.getParameter("legalRepresentative"));
		newCustomer.setLegalRepresentativewt(req
				.getParameter("legalRepresentativewt"));
		newCustomer.setShareholderBackground(req
				.getParameter("shareholderBackground"));
		newCustomer.setManageFund(req.getParameter("manageFund"));
		newCustomer.setInvestorHistory(req.getParameter("investorIndustry"));
		newCustomer.setInvestorType(req.getParameter("investorType"));
		newCustomer.setSuccessInvestor(req.getParameter("successInvestor"));
		try {
			newCustomer.setIntentionMoney(Double.parseDouble(req
					.getParameter("intentionMoney")));
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "��������ȷ��������");
			return map;
		}

		newCustomer.setNeedResource(req.getParameter("needResource"));
		newCustomer.setInvestorHistory(req.getParameter("investorHistory"));

		try {
			newuser.toPerfect(newCustomer);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("res", "�ύʧ�ܣ��Ժ�����");
			return map;
		}

		map.put("res", "�ύ�ɹ�");
		return map;
	}

	@RequestMapping("/privateDebtList")
	public String getPrivateDebtList(Map<String, Integer> model) {
		model.put("leftOn", 1);
		return "investor/private-debt-list";
	}

	@RequestMapping("/queryProtocol")
	public String getQueryProtocol() {
		return "investor/search-protocol";
	}

	@RequestMapping(value = "/investSituation", method = RequestMethod.GET)
	public String getSituation() {
		return "investor/socket-manage";
	}

	@RequestMapping("/modifyContract")
	public String getmodifyContract() {
		return "investor/modify-contract";
	}

	@RequestMapping("/historyInquiry")
	public String getHistoryInquiry() {
		return "investor/history-inquiry";
	}

	@ResponseBody
	@RequestMapping("/logined")
	public Object getLogined(HttpSession session) {
		String citiuser = (String) session.getAttribute("citiuser");
		Map<String, Object> map = new HashMap<String, Object>();
		if (citiuser == null) {
			map.put("isLogined", 0);
			return map;
		}

		String[] citiuserSplit = citiuser.split("=");
		if (citiuserSplit[0].equals("iid")) {
			map.put("isLogined", 1);
			return map;
		}

		map.put("isLogined", 0);
		return map;
	}

	@ResponseBody
	@RequestMapping("/equity/{pid}")
	public Object getEquity(@PathVariable String pid) {
		Map<String, Object> model = new HashMap<String, Object>();
		equity pro;
		try {
			pro = newuser.getequity(pid);
		} catch (Exception e) {
			e.printStackTrace();
			model.put("error", "error");
			return model;
		}
		model.put("equ", pro);
		return model;

	}

	@ResponseBody
	@RequestMapping("/debtDetail/{pid}")
	public Object getdebtDetail(@PathVariable String pid) {
		Map<String, Object> model = new HashMap<String, Object>();
		debtDetail pro;
		try {
			pro = newuser.getDebtDetail(pid);
		} catch (Exception e) {
			e.printStackTrace();
			model.put("error", "err");
			return model;
		}

		model.put("debt", pro);
		return model;
	}
}
