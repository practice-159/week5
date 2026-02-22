{!isAuthenticated ? (
        // 沒有登入的狀態
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <Login
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          </div>
        </div>
      ) : (
        // 有登入的狀態
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
              {/* 產品列表 */}
              <Table
                productList={productList}
                productModal={productModal}
                setModalType={setModalType}
                setTemplateData={setTemplateData}
                INITIAL_TEMPLATE_DATA={INITIAL_TEMPLATE_DATA}
              />
              {/* Modal */}
              <ProductModalComponent
                API_PATH={API_PATH}
                modalType={modalType}
                productModal={productModal}
                templateData={templateData}
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                productModalRef={productModalRef}
              />
              <Pagination
                pagination={pagination}
                fetchProducts={fetchProducts}
              />
            </div>
          </div>
        </div>
      )}